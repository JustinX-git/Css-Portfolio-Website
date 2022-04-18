class TypeWriter{
  constructor(txtElement, cursor, words, wait) {
    this.txtElement = txtElement
    this.words = words;
    this.cursor = cursor
    this.txt = "";
    this.wait = parseInt(wait, 10);
    this.wordIndex = 0;
    this.type();
    this.isDeleting = false
  }
};

TypeWriter.prototype.type = function () {
  this.cursor.className = "static-cursor";
  const current = this.wordIndex % this.words.length
  const fullTxt = this.words[current];
  
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1)
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  let typeSpeed = 350;

  if (this.isDeleting) {
  typeSpeed /= 2
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.cursor.className = "blinking-cursor"
    this.isDeleting = true
  } else if (this.isDeleting && this.txt === "") {
    typeSpeed = 500;
    this.cursor.className = "blinking-cursor__xtra"
    this.isDeleting = false;
    this.wordIndex++
  }

  setTimeout(() => this.type(), typeSpeed)
}


window.onload = function () {
  const elem = document.querySelector(".txt-type"), 
    txt = document.querySelector(".txt"),
    cursor = document.querySelector(".static-cursor")
    wait = elem.getAttribute("data-wait"),
    words = JSON.parse(elem.getAttribute("data-titles"));
  
   const typeWriter = new TypeWriter(txt, cursor, words, wait)
}

