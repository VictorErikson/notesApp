\*FIX Errors:

-wrong color on the date-text at notes in edit daymode
-wrong color on tags in note, edit, darkmode

-fix so the "open"-note is maked on the menu in desktop
-a better loading-menu

-fix so "loading content" doesnt blink by when screen-width changes
(set the allnotes/sidebar/heading elements outside so they dont reload when traveling between startpage and new/exisitng note page?)

-fix so components that doesnt change are outside route so they dont have to re-render?

-re-saving existing note makes tags into one tag

-"Failed to fetch users" -error in AllNotesMobile

\* BUG if user make field empty when editing

\*redo buttons to links?

\*insert showRestore button into NoteTopMenuMobile

\*fix saveNote function in services

<!-- \*allnotes-page if the list is long enought do the list get cut off at the bottom -->

\*Sanitizy input from dangerouslySetInnetHTML in Note.tsx:
How to Use It Safely
✅ 1. Sanitize Input Before Using dangerouslySetInnerHTML
Use libraries like DOMPurify to remove harmful scripts before rendering.

        tsx
        Kopiera
        Redigera
        import DOMPurify from "dompurify";

        const safeHTML = DOMPurify.sanitize(editableNote.text);

        <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
        This removes harmful JavaScript while keeping safe HTML like <b> and <i>.

        ✅ 2. Only Use It When Necessary
        If you just need to display user input without HTML formatting, use plain text instead:

        tsx
        Kopiera
        Redigera
        <p>{editableNote.text}</p>
        This prevents security risks without needing dangerouslySetInnerHTML.

        📊 Pros & Cons of dangerouslySetInnerHTML
        ✅ Pros	❌ Cons
        Allows rich text (bold, italics, links)	Risk of XSS (security vulnerabilities)
        Useful for rendering saved HTML content	React doesn’t track updates inside it
        Needed for some WYSIWYG editors	Harder to debug and control content
        🚀 When to Use dangerouslySetInnerHTML
        ✔ If you trust the HTML content (e.g., pre-sanitized text from your own system).
        ✔ When displaying formatted content from a database (like blog posts, markdown, or WYSIWYG editors).
        ❌ Avoid it for user-generated input unless you sanitize it first!
