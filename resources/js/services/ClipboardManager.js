
class ClipboardManager
{
	static copy(text)
	{
		// The async Clipboard API only exists in secure contexts (HTTPS or localhost)
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(text);
		}

		return ClipboardManager.legacyCopy(text);
	}

	static legacyCopy(text)
	{
		return new Promise(function(resolve, reject) {
			let textarea = document.createElement('textarea');

			textarea.value = text;
			textarea.setAttribute('readonly', '');
			textarea.style.position = 'fixed';
			textarea.style.top = '0';
			textarea.style.left = '0';
			textarea.style.opacity = '0';
			textarea.style.fontSize = '12pt';

			document.body.appendChild(textarea);
			textarea.select();

			try {
				document.execCommand('copy') ? resolve() : reject(new Error('Unable to copy text to clipboard.'));
			} finally {
				document.body.removeChild(textarea);
			}
		});
	}
}

export default ClipboardManager;
