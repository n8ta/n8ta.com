document.addEventListener('DOMContentLoaded',function() {
    const latest_post = document.getElementById('latest-post')
    if (latest_post) {
        const now = Math.floor( new Date / 1000)
        const posted_at = parseInt(latest_post.dataset['time'])
        const diff = (now - posted_at) / (60*60*24)
        if (diff < 7) {
            latest_post.style.display = 'inline-block'
        }
    }
})