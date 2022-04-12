document.addEventListener('DOMContentLoaded',function() {
    const post = document.querySelector('.latest-posts')
    if (post) {
        const now = Math.floor( new Date / 1000)
        const posted_at = parseInt(post.dataset['time'])
        const diff = (now - posted_at) / (60*60*24)
        if (diff < 7) {
            post.style.display = 'inline-block'
        }
    }
})