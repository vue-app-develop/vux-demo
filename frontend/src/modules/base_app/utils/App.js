const restart = () => {
  if (navigator.splashscreen) {
    navigator.splashscreen.show()
  }
  window.location.href = 'index.html'
}

export default { restart }
