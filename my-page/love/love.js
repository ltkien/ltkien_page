// Lấy nút Không
const no = document.getElementById("noBtn");

// Lấy nút Có
const yes = document.getElementById("yesBtn");

// Lấy tất cả trái tim
const hearts = document.querySelectorAll(".hearts span");

let clicks = 0;


// =======================
// NÚT KHÔNG
// =======================

no.addEventListener("click", function () {

    clicks++;

    console.log("Đã bấm nút Không:", clicks);

    // Giảm kích thước nút
    const fontSize = Math.max(8, 18 - clicks * 2);

    no.style.fontSize = `${fontSize}px`;

    // Vị trí ngẫu nhiên
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;

    no.style.transform = `translate(${x}px, ${y}px)`;
});


// =======================
// NÚT CÓ
// =======================

yes.addEventListener("click", function () {

    console.log("Đã bấm nút Có ❤️");

    hearts.forEach(function (heart) {

        heart.classList.add("animate");

    });

});