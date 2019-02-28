'use strict'

const filters = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hue: 0,
  invert: 0,
  saturate: 100
}

const css = ({ blur, brightness, contrast, grayscale, hue, invert, saturate }) => `
img, video {
  filter: blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hue}deg) invert(${invert}%) saturate(${saturate}%) !important
}
`

function applyFilter () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.insertCSS(tabs[0].id, {
      allFrames: true,
      code: css(filters)
    })
  })
}

const gui = new dat.GUI({ hideable: false })
gui.add(filters, 'blur', 0, 10).onChange(applyFilter)
gui.add(filters, 'brightness', 0, 400).onChange(applyFilter)
gui.add(filters, 'contrast', 0, 400).onChange(applyFilter)
gui.add(filters, 'grayscale', 0, 100).onChange(applyFilter)
gui.add(filters, 'hue', 0, 360).onChange(applyFilter)
gui.add(filters, 'invert', 0, 100).onChange(applyFilter)
gui.add(filters, 'saturate', 0, 400).onChange(applyFilter)
