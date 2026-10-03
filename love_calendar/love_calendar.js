let love_date = null;

let current_month = new Date();


// =====================
// LOAD ẢNH NỀN
// =====================

const image_input =
    document.getElementById(
        "love_calendar_image"
    );


if (localStorage.getItem("love_image")) {

    document.querySelector(
        ".love_calendar_container"
    ).style.backgroundImage =
        `url(${localStorage.getItem("love_image")})`;

}





if (image_input) {


    image_input.onchange = function (e) {


        const file = e.target.files[0];


        if (!file)
            return;



        const reader =
            new FileReader();



        reader.onload = function (event) {


            let image =
                event.target.result;



            localStorage.setItem(
                "love_image",
                image
            );



            document.querySelector(
                ".love_calendar_container"
            ).style.backgroundImage =
                `url(${image})`;


        };


        reader.readAsDataURL(file);


    };


}









// =====================
// BUTTON
// =====================


document.getElementById(
    "love_calendar_button"
)
    .onclick = function () {



        let value =
            document.getElementById(
                "love_calendar_date"
            ).value;



        if (!value) {

            alert(
                "Hãy nhập ngày yêu nhau ❤️"
            );

            return;

        }



        love_date =
            new Date(value);



        current_month =
            new Date();



        render_calendar();


        calculate_anniversary_countdown();


    };









// =====================
// RENDER LỊCH
// =====================


function render_calendar() {


    let year =
        current_month.getFullYear();


    let month =
        current_month.getMonth();




    document.getElementById(
        "calendar_title"
    ).textContent =
        `${month + 1}/${year}`;





    let first =
        new Date(
            year,
            month,
            1
        );



    let last =
        new Date(
            year,
            month + 1,
            0
        );





    let box =
        document.getElementById(
            "calendar_days"
        );



    box.innerHTML = "";





    let start =
        first.getDay();



    if (start === 0)
        start = 7;





    for (
        let i = 1;
        i < start;
        i++
    ) {

        let empty =
            document.createElement(
                "div"
            );


        empty.className =
            "empty_day";


        box.appendChild(empty);

    }








    for (
        let i = 1;
        i <= last.getDate();
        i++
    ) {



        let date =
            new Date(
                year,
                month,
                i
            );



        let day =
            document.createElement(
                "div"
            );


        day.className =
            "day";



        day.textContent = i;







        // hôm nay

        if (
            same_day(
                date,
                new Date()
            )
        ) {

            day.classList.add(
                "today"
            );

        }






        // ngày yêu

        if (
            same_day(
                date,
                love_date
            )
        ) {

            day.classList.add(
                "love_day"
            );

        }








        // tháng

        if (

            date.getDate()
            ===
            love_date.getDate()

            &&

            !same_day(
                date,
                love_date
            )

        ) {

            day.classList.add(
                "month_day"
            );

        }








        // ngày đặc biệt

        let milestones =
            [
                100,
                200,
                300,
                500,
                1000
            ];



        milestones.forEach(num => {


            let special =
                new Date(
                    love_date
                );


            special.setDate(
                special.getDate()
                +
                num
            );



            if (
                same_day(
                    date,
                    special
                )
            ) {

                day.classList.add(
                    "special_day"
                );

            }


        });




        box.appendChild(day);


    }


}









// =====================
// SO SÁNH NGÀY
// =====================


function same_day(a, b) {


    return (

        a.getDate()
        ===
        b.getDate()

        &&

        a.getMonth()
        ===
        b.getMonth()

        &&

        a.getFullYear()
        ===
        b.getFullYear()

    );

}









// =====================
// ĐỔI THÁNG
// =====================


document.getElementById(
    "prev_month"
)
    .onclick = function () {


        if (!love_date)
            return;


        current_month.setMonth(
            current_month.getMonth() - 1
        );


        render_calendar();


    };




document.getElementById(
    "next_month"
)
    .onclick = function () {


        if (!love_date)
            return;


        current_month.setMonth(
            current_month.getMonth() + 1
        );


        render_calendar();


    };









// =====================
// COUNTDOWN
// =====================


function calculate_anniversary_countdown() {


    month_countdown();

    day_countdown();

    year_countdown();


}









function month_countdown() {


    let today =
        new Date();


    let month = 1;


    let next =
        new Date(
            love_date
        );



    while (next <= today) {


        next =
            new Date(
                love_date
            );


        next.setMonth(
            love_date.getMonth() + month
        );


        month++;


    }



    document.getElementById(
        "month_anniversary"
    ).innerHTML =


        `
<span class="anniversary_title">
❤️ Kỷ niệm ${month - 1} tháng
</span>

<br>

<span class="anniversary_date">
${format_date(next)}
- còn ${remaining_days(next)} ngày
</span>
`;



}









function day_countdown() {


    let today =
        new Date();


    let list =
        [
            100,
            200,
            300,
            500,
            1000
        ];



    for (let num of list) {


        let next =
            new Date(
                love_date
            );


        next.setDate(
            next.getDate() + num
        );



        if (next > today) {


            document.getElementById(
                "day_anniversary"
            ).innerHTML =


                `
<span class="anniversary_title">
💛 Kỷ niệm ${num} ngày
</span>

<br>

<span class="anniversary_date">
${format_date(next)}
- còn ${remaining_days(next)} ngày
</span>
`;

            return;


        }


    }



}









function year_countdown() {


    let today =
        new Date();


    let year = 1;


    let next =
        new Date(
            love_date
        );



    while (next <= today) {


        next =
            new Date(
                love_date
            );


        next.setFullYear(
            love_date.getFullYear() + year
        );


        year++;


    }



    document.getElementById(
        "year_anniversary"
    ).innerHTML =


        `
<span class="anniversary_title">
💖 Kỷ niệm ${year - 1} năm
</span>

<br>

<span class="anniversary_date">
${format_date(next)}
- còn ${remaining_days(next)} ngày
</span>
`;



}









function remaining_days(date) {


    return Math.ceil(

        (date - new Date())
        /
        (
            1000 * 60 * 60 * 24
        )

    );


}









function format_date(date) {


    return (

        date.getDate()
        +
        "/"
        +
        (date.getMonth() + 1)
        +
        "/"
        +
        date.getFullYear()

    );


}