let selectedSeat = [];
let totalPrice = 0;

function handleSelectSeat(event) {
  const value = event.innerText;
  if (selectedSeat.includes(value)) {
    return alert("Seat allready Booked");
  } else if (selectedSeat.length < 4) {
    event.classList.add("bg-primary");
    event.classList.add("text-white");

    selectedSeat.push(event.innerText);

    const totalBookedEl = document.getElementById("total-booked");
    totalBookedEl.innerText = selectedSeat.length;

    const availableSeatEl = document.getElementById("available-seat");
    const availableSeatValue = parseFloat(availableSeatEl.innerText);
    const newAvailableSeatValue = availableSeatValue - 1;
    availableSeatEl.innerText = newAvailableSeatValue;

    const defaultText = document.getElementById("default-text");
    defaultText.classList.add("hidden");

    const selectedSeatEl = document.getElementById("selected-seat");
    selectedSeatEl.innerHTML += `<li class="text-base font-normal flex justify-between">
    <span>${event.innerText}</span>
    <span>Economy</span>
    <span>550</span>
    </li>`;

    totalPrice += 550;
    const totalPriceEl = document.getElementById("total-price");
    totalPriceEl.innerText = totalPrice.toFixed(2);

    const couponInputEl = document.getElementById("coupon-field");
    const couponBtnEl = document.getElementById("coupon-btn");
    if (selectedSeat.length > 3) {
      couponInputEl.removeAttribute("disabled");
      couponBtnEl.removeAttribute("disabled");
    }
  } else {
    return alert("Maximum seat booked");
  }
}

document.getElementById("coupon-btn").addEventListener("click", function () {
  const couponInputEl = document.getElementById("coupon-field");
  const couponInputValue = couponInputEl.value;

  let couponSave = 0;
  if (couponInputValue !== "NEW50" && couponInputValue !== "Couple 20") {
    return alert("Your provided coupon is not valid");
  }

  if (couponInputValue === "NEW50") {
    couponSave = totalPrice * 0.5;
  } else if (couponInputValue === "Couple 20") {
    couponSave = totalPrice * 0.2;
  }

  const showCouponPriceEl = document.getElementById("show-coupon-price");
  showCouponPriceEl.innerHTML = `
    <p>Discount</p>
    <p>
      <span>-BDT: </span>
      <span>${couponSave.toFixed(2)}</span>
    </p>
  `;

  const grandTotalEl = document.getElementById("grand-total");
  const grandTotalValue = totalPrice - couponSave;
  grandTotalEl.innerText = grandTotalValue.toFixed(2);
});

const phoneNumberEl = document.getElementById("phone-number");
const nextBtnEl = document.getElementById("next-btn");
phoneNumberEl.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  if (inputValue.length >= 11) {
    nextBtnEl.removeAttribute("disabled");
  }
});

document.getElementById("btn-continue").addEventListener("click", function () {
  window.location.reload();
});