/*
 * Draft annotator widget.
 *
 * When a draft post is rendered locally (the partial only loads this
 * file in that case), the reader can select text in the body, leave
 * a quick comment, and have it appended to a sibling `_review.md`
 * file in the post's page bundle via the local feedback server.
 *
 * No build step. No framework. Vanilla DOM.
 */
(function () {
  const wrap = document.getElementById('draft-annotator');
  if (!wrap) return;
  const slug = wrap.dataset.slug;
  const lang = wrap.dataset.lang;
  const server = wrap.dataset.server;

  // -------- floating "annotate" button (FAB) --------
  const fab = document.createElement('div');
  fab.id = 'annotator-fab';
  fab.innerHTML = '<button type="button" title="Annotate this selection">💬</button>';
  document.body.appendChild(fab);

  // -------- popup with quote, textarea, actions --------
  const popup = document.createElement('div');
  popup.id = 'annotator-popup';
  popup.innerHTML = ''
    + '<div class="annotator-quote"></div>'
    + '<textarea placeholder="Your comment..."></textarea>'
    + '<div class="annotator-actions">'
    + '  <span class="annotator-shortcut">Ctrl+Enter to save, Esc to cancel</span>'
    + '  <button type="button" class="annotator-cancel">Cancel</button>'
    + '  <button type="button" class="annotator-submit">Save</button>'
    + '</div>'
    + '<div class="annotator-status"></div>';
  document.body.appendChild(popup);

  let currentSelection = null;

  // -------- offline indicator --------
  const offlineBanner = document.createElement('div');
  offlineBanner.id = 'annotator-offline';
  offlineBanner.innerHTML = ''
    + '<span>Annotator server is offline. Run </span>'
    + '<code>make serve-draft</code>'
    + '<span> (or </span>'
    + '<code>python3 scripts/feedback-server.py</code>'
    + '<span>) to enable annotation.</span>';
  offlineBanner.style.display = 'none';
  document.body.appendChild(offlineBanner);

  // -------- health check on load --------
  fetch(server + '/health', { method: 'GET' })
    .then((r) => r.json())
    .then((data) => {
      if (!(data && data.ok)) {
        offlineBanner.style.display = 'block';
      }
    })
    .catch(() => {
      offlineBanner.style.display = 'block';
    });

  // -------- selection tracking --------
  document.addEventListener('selectionchange', () => {
    if (popup.style.display === 'block') return; // popup is open; don't move FAB
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim() : '';
    if (!text) {
      fab.style.display = 'none';
      currentSelection = null;
      return;
    }
    // Only respond to selections inside .post-content
    const range = sel.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const postContent = document.querySelector('.post-content');
    if (!postContent || !postContent.contains(container)) {
      fab.style.display = 'none';
      currentSelection = null;
      return;
    }
    const rect = range.getBoundingClientRect();
    fab.style.display = 'block';
    fab.style.top = (rect.top + window.scrollY - 40) + 'px';
    fab.style.left = Math.min(window.innerWidth - 60, rect.right + window.scrollX + 8) + 'px';
    currentSelection = {
      text,
      paragraphIndex: getParagraphIndex(range.startContainer, postContent)
    };
  });

  // -------- FAB click opens the popup --------
  // Pressing the mouse down on the button would otherwise collapse the
  // selection before the click lands, which is how a click ends up doing
  // nothing at all.
  fab.addEventListener('mousedown', (e) => e.preventDefault());

  fab.querySelector('button').addEventListener('click', () => {
    // Recover from a lost selection rather than returning silently: a button
    // that does nothing is indistinguishable from a broken widget, which is
    // exactly the report this guard exists to prevent.
    if (!currentSelection) {
      const sel = window.getSelection();
      const text = sel && sel.rangeCount ? sel.toString().trim() : '';
      const postContent = document.querySelector('.post-content');
      if (text && postContent) {
        currentSelection = {
          text,
          paragraphIndex: getParagraphIndex(sel.getRangeAt(0).startContainer, postContent)
        };
      }
    }
    popup.style.display = 'block';
    fab.style.display = 'none';
    if (currentSelection) {
      popup.querySelector('.annotator-quote').textContent = currentSelection.text;
      popup.querySelector('.annotator-status').textContent = '';
    } else {
      popup.querySelector('.annotator-quote').textContent = '';
      popup.querySelector('.annotator-status').textContent =
        'The selection was lost. Close this, select the text again, then click the bubble.';
    }
    popup.querySelector('textarea').focus();
  });

  // -------- closing the popup from outside it --------
  // Without these, a popup dismissed by clicking elsewhere stays at
  // display:block, and the selectionchange handler above then returns early
  // forever: the button stops responding for the rest of the page's life.
  document.addEventListener('mousedown', (e) => {
    if (popup.style.display !== 'block') return;
    if (popup.contains(e.target) || fab.contains(e.target)) return;
    popup.querySelector('.annotator-cancel').click();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.style.display === 'block') {
      popup.querySelector('.annotator-cancel').click();
    }
  });

  // -------- keyboard shortcuts inside the popup --------
  // Ctrl+Enter (or Cmd+Enter on macOS) saves. Escape cancels.
  popup.querySelector('textarea').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      popup.querySelector('.annotator-submit').click();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      popup.querySelector('.annotator-cancel').click();
    }
  });

  // -------- cancel --------
  popup.querySelector('.annotator-cancel').addEventListener('click', () => {
    popup.style.display = 'none';
    popup.querySelector('textarea').value = '';
    popup.querySelector('.annotator-status').textContent = '';
    currentSelection = null;
  });

  // -------- submit --------
  popup.querySelector('.annotator-submit').addEventListener('click', () => {
    if (!currentSelection) return;
    const textarea = popup.querySelector('textarea');
    const status = popup.querySelector('.annotator-status');
    const comment = textarea.value.trim();
    if (!comment) {
      status.textContent = 'Comment cannot be empty.';
      return;
    }
    status.textContent = 'Saving...';
    fetch(server + '/annotate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: lang,
        post_slug: slug,
        selected_text: currentSelection.text,
        comment: comment,
        paragraph_index: currentSelection.paragraphIndex
      })
    })
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          status.textContent = 'Error: ' + (data && data.error ? data.error : 'unknown');
          return;
        }
        status.textContent = 'Saved to ' + (data.file || '_review.md');
        textarea.value = '';
        setTimeout(() => {
          popup.style.display = 'none';
          status.textContent = '';
          currentSelection = null;
        }, 1200);
      })
      .catch((e) => {
        offlineBanner.style.display = 'block';
        // Re-check the health endpoint so the banner only stays up if the
        // server really is unreachable.
        fetch(server + '/health').then(() => { offlineBanner.style.display = 'none'; }).catch(() => {});
        status.textContent = 'Network error: ' + e.message
          + '. The feedback server at ' + server + ' did not respond. '
          + 'Start it with `make serve-draft` (or `python3 scripts/feedback-server.py` in a second terminal), '
          + 'and load the page at the same hostname (localhost vs 127.0.0.1 matters).';
      });
  });

  // -------- helper: find which post-content child the selection lives in --------
  function getParagraphIndex(node, postContent) {
    while (node && node.nodeType !== 1) node = node.parentNode;
    const tags = ['P', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'UL', 'OL', 'LI', 'PRE', 'FIGURE'];
    while (node && node !== postContent && !tags.includes(node.tagName)) {
      node = node.parentNode;
    }
    if (!node || node === postContent) return -1;
    const all = Array.from(postContent.querySelectorAll('p, h2, h3, h4, blockquote, ul, ol, pre, figure'));
    return all.indexOf(node);
  }
})();
