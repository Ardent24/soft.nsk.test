import './styles/main';

const controlsRange = (() => {
  const inputRange = document.querySelector('.main-form__range');
  const valueRange = document.querySelector('.main-form__range-result');

  inputRange.addEventListener('input', () => valueRange.innerHTML = inputRange.value + '%');
})();

const createSelect = (() => {
// eslint-disable-next-line one-var
  let x, i, j, l, ll, selElmnt, a, b, c;
// eslint-disable-next-line prefer-const
  x = document.getElementsByClassName('custom-select');
// eslint-disable-next-line prefer-const
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName('select')[0];
    ll = selElmnt.length;
    a = document.createElement('DIV');
    a.setAttribute('class', 'select-selected');
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement('DIV');
    b.setAttribute('class', 'select-items select-hide');
    for (j = 1; j < ll; j++) {
      c = document.createElement('DIV');
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener('click', function(e) {
        // eslint-disable-next-line one-var
        let y, i, k, s, h, sl, yl;
        // eslint-disable-next-line prefer-const,no-invalid-this
        s = this.parentNode.parentNode.getElementsByTagName('select')[0];
        // eslint-disable-next-line prefer-const
        sl = s.length;
        // eslint-disable-next-line prefer-const,no-invalid-this
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          // eslint-disable-next-line no-invalid-this
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            // eslint-disable-next-line no-invalid-this
            h.innerHTML = this.innerHTML;
            // eslint-disable-next-line no-invalid-this
            y = this.parentNode.getElementsByClassName('same-as-selected');
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute('class');
            }
            // eslint-disable-next-line no-invalid-this
            this.setAttribute('class', 'same-as-selected');
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener('click', function(e) {
      e.stopPropagation();
      // eslint-disable-next-line no-invalid-this
      closeAllSelect(this);
      // eslint-disable-next-line no-invalid-this
      this.nextSibling.classList.toggle('select-hide');
      // eslint-disable-next-line no-invalid-this
      this.classList.toggle('select-active');
    });
  }
  function closeAllSelect(elmnt) {
    a.classList.remove('select-active');
    /* A function that will close all select boxes in the document,
    except the current select box: */
    let x;
    let y;
    let i;
    let xl;
    let yl;
    const arrNo = [];
    // eslint-disable-next-line prefer-const
    x = document.getElementsByClassName('select-items');
    // eslint-disable-next-line prefer-const
    y = document.getElementsByClassName('select-selected');
    // eslint-disable-next-line prefer-const
    xl = x.length;
    // eslint-disable-next-line prefer-const
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove('select-arrow-active');
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) x[i].classList.add('select-hide');
    }
  }

  document.addEventListener('click', closeAllSelect);
})();