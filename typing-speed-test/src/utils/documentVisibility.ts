function setupDocumentVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            document.title = 'Come back to Speedy!';
        } else {
            document.title = 'Speedy - Test Your Typing Skills';
        }
    });
}

export default setupDocumentVisibilityListener;
