const toggle = document.querySelector(".toggle-menu");
const menu = document.querySelector(".menu");
const subMenu = document.querySelector(".level-one");
const { clientWidth: menuWidth, clientHeight: menuHeight } = menu;

menu.style.display = "none";

let coords = {
  x: 0,
  y: 0,
};

const positionToggle = (e) => {
  const { x: toggleClickedX, y: toggleClickedY } = coords;

  let top = e.y - toggleClickedY,
    left = e.x - toggleClickedX;

  if (top + toggle.clientHeight > innerHeight)
    top = innerHeight - toggle.clientHeight;
  else if (top < 0) top = 0;

  if (left + toggle.clientWidth >= innerWidth)
    left = innerWidth - toggle.clientWidth;
  else if (left < 0) left = 0;

  toggle.style.top = `${top}px`;
  toggle.style.left = `${left}px`;

  coords = { x: 0, y: 0 };
  positionMenu(left, top + toggle.clientHeight);
};

const positionMenu = (x, y) => {
  let left, top;

  if (x <= 0) {
    left = 0;
  } else if (x + menuWidth > innerWidth) {
    left = innerWidth - menuWidth;
  } else {
    left = x;
  }

  if (y + menuHeight + 10 >= innerHeight) {
    top = y - menuHeight - toggle.clientHeight - 10;
  } else {
    top = y + 10;
  }

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  positionSubMenu(left);
};

const positionSubMenu = (menuLeft) => {
  if (menuLeft + menuWidth * 2 >= innerWidth)
    subMenu.style.right = `${menuWidth}px`;
  else subMenu.style.right = `${-menuWidth}px`;
};

toggle.addEventListener("click", () => {
  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
    menu.classList.add("hide");
  } else {
    menu.style.display = "block";
    menu.classList.add("show");
    menu.classList.remove("hide");
  }
});

toggle.addEventListener("mousedown", (e) => {
  coords = { x: e.offsetX, y: e.offsetY };
});

toggle.addEventListener("dragend", positionToggle);

menu.addEventListener("animationend", (e) => {
  if (e.animationName === "fadeOut") {
    menu.style.display = "none";
  }
});

positionMenu(0, toggle.clientHeight);
