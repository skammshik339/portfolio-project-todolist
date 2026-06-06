import styles from "./WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles["container"]}>
      <main className={styles["main-content"]}>
        <h1 className={styles["title"]}>Todolist</h1>
        <p className={styles["subtitle"]}>
          Простой и удобный инструмент для планирования ваших ежедневных дел,
          контроля задач и повышения личной продуктивности.
        </p>

        <div className={styles["divider"]} />

        <h3 className={styles["steps-title"]}>Как пользоваться приложением:</h3>

        <div className={styles["steps-list"]}>
          <div className={styles["step-item"]}>
            <span className={styles["step-number"]}>1</span>
            <span className={styles["step-text"]}>
              Заполните заголовок и описание в блоке «Добавить задачу».
            </span>
          </div>

          <div className={styles["step-item"]}>
            <span className={styles["step-number"]}>2</span>
            <span className={styles["step-text"]}>
              Выберите приоритет (Низкий, Средний или Высокий) для правильной
              сортировки фокуса.
            </span>
          </div>

          <div className={styles["step-item"]}>
            <span className={styles["step-number"]}>3</span>
            <span className={styles["step-text"]}>
              Нажмите «Создать» — задача мгновенно появится в вашем списке дел.
            </span>
          </div>

          <div className={styles["step-item"]}>
            <span className={styles["step-number"]}>4</span>
            <span className={styles["step-text"]}>
              Кликните по карточке задачи для её редактирования, изменения статуса выполнения или удаления.
            </span>
          </div>
        </div>
      </main>

      <footer className={styles["footer"]}>
        <a
          href="https://t.me/skamshik339"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["tg-link"]}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span>Написать в Telegram</span>
        </a>
        <div className={styles["copyright"]}>
          created by aleksey-borovikov-dev
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUSEBAQFhUVGBgYFRcVEA8YGBcXGBUXFxUWFRUYHSggGBolGxcVITEiJSkrLi4uGB8zODMsNygtLi0BCgoKDg0OFw8PFS0dHR8tKy0tLS0tLS0rLS0tLS0tKy0tLSstLSsrLS0tLSstKy0tLS0rLS0tLSstLS0tKy0rLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAAAQMEBQYCBwj/xABDEAACAgECAwUECAQDBQkAAAABAgADEQQhBRIxBhNBUWEicYGRBxQjMqGxwfBCUmLRkqLxJENTwuEVFmNygpOjstL/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAdEQEAAwADAQEBAAAAAAAAAAAAAQIRAxIhQTEE/9oADAMBAAIRAxEAPwD51COE9rkUI4QFCOEBQjhAUI4QFCOEBQjhAUI4QFCOEBQjhAUI4QFCOEBQjhAUI4QFCOEBwjhMhQgDDMAhHCAoRwgKEcIChHCAoRwgKEcIChHCAoRwgKEcIChHCAoRwgKEcIChHCA5tdi+HLqdfpqX+61mW9QitYVPoQnL8ZjS9wPij6O+vU1BC9ZJUOCV9pGQ5AIPRj4zMq+tfSp2PqeqzWq3IaKsCtEQK2HJyT5+1+EvcK7FU38Ip0xIRrUqsa1UUvzMy3MAT4Z9n3T55xr6StZq6LNPbXpQlg5WK12hgMg7E2EeHlJtD9KmuprrqSvSctaKi5ruzhVCjOLOuBOeWxrYcjxrRDT6i6kMWFVj1gkDJCMVyR8JTlniOsa+2y5woa12dgoIGXYscAk7ZMrzoyUI4RoUI4RoUI4RoUI4RoUI4RoUI4RoUI4RoUlr0zN0U/IzpOyPZ3vvtbR7P8Knx/qM7VOz6joAJ5OX+rJysPTx8GxtpfJLaip3/X9Z4n0zi3AKypDKCPdPnOs0bU2FDuvVT6eR9RNcP9Hecn9Tl4ekbCGEcJ6decoRwjQoRwgOEcRkUQnS9p+zY0lNDq2XH2WqH/D1DIL1T/27ANtvsz4kyjpOzeptRXRE9tWatDdSttqpnnaqktzOBg9B4bZk0ZEJu8M7JavU112VLUVtz3fNqNOrPysVPKjMCdwfCV+F9n79SvNT3JJLBEOooWxyoywrqZuZiBv0jRlQnRcG4StiUhtJfbbqDb9WNd6qtgX7Nu+XGUWtwW5gRkddhmc8y4OPLaXQoTS4bwPUalQ1FRcGwVbFfvlWffJ2XlViWOwxuZ74f2fuvJWptOSH7tQdVpl7x/5auZvtOowRsfOTRlQmtpuzmpsVXWrCnvcszoqoKCBabCxArAJA9rGfCU+G6CzUWpTSOZ3OFGQMnBPU7DYGNFWEs6fQvZULkANZtWkHnQfaMhdVOTsOUE5O3rLXE+B3adFsfumRmKB6r6bVDqMtWxQnDAb4MujMhLWr4fZUlVliFVuUvWT/ABKGKk/gD7mU+M0LOy2rWo2moYCd6yd7V3q1f8Rqc84X1xJoxYQjlCiJxv5T1PdNPOwXIHNtk5wPU48JJkiH1PswylF5emBOyQArsvxnznsdqloqAvcKUyCT/SSDv5bdZ1Wi7Y6a5+709i2PgthQx9lepz5dJ8uPJl9CZ3MHGq8A7T5R2tv5WRfNj8sYM7riPbfT2Fhi842OKbMA+WcfnPmvaTUix1sUNy8w2PXfp85rjjL6zedpiGEeDtkYJAJHlkZxCfSid9eGYycKEcJQoRwgE2eylmlS/vdZzlKlNtaL/vLUdClR2IwRzdcDbczHm92K4Smr1JpdS2arWUBiCXVCU3B88TMyre03HeGXNqK7xr1TWOHtsssoYVurM6ugRMjc8vQ7EDoJW4d23CU0K31pbNPV3SiptMK7AAe7Z2ZDYhGd+U749cTK4zwqqhq9HWO81QYC+zvOVBY2AKK+YhcLkZdup8htIj2Y1PPUirU/fc4qau+h0Y1qWsXvFYgFQDsZPBc0faSuq3QMtVnJogebLKXd3ZnsI6ADmY4HlLvZntdRpE04NV4alnNgrGm5L+YnlexmXn5lBAAB8BuOk5fXcOsoCd6vKbFDqpI5wp+6XTqmfANgz2vC7T9X9kf7UxWj209thYKiOvs+2QN8R4Oh4D22bSV6Spa8LQzm5l5e8tV73tFSsfup7Sk/zEeQ3wNTp6Rp67BYTdZZZlAyEV1LgLzjqHZixG+OUdOhljSdmtTbnlWsYsNI7y+ivnuU4NVXOw7xs+WZnJpXNgp5SLC/d8p2Ifm5eU56Hm23gbvZ3tP9UoenuudbbQblbHJZQanrsqPiCeYEEdCo9xu8E7T6XShBXVqVFd5sHL9UzcnMpRb2ZSQUAIHLgHrsTkc23DLQNQSo/wBlYJf7S+wxsNQHX2vbBG2ZY1vAL6azawqKKVV+71FFhrZhlRYEYlSfWPBtJ2vrNP1a2l3oss1LXJlAT3tq20vW3hZWw8djk/DE7NcSXSaurUMrMtTFsDAYjlYDxwDvK1nD7FpS8oRVYzIjeBZMcw/H/K3kZf0nZfV21i1KgQ4Zq1NlQssVfvNXUW53A36DfwzHg0Ke2LvVSmtU6g1apLyGWlVatanQ1kKoyeZ+bcY2xLWs7QaTVrVptQ+rWkahrbLXXT84TuWUIq0pt7XKOh2J6bAcYIQO14z2g0GtpurddZWd7dOGNJSqxaVqSisIpK1sFXIO2VzkGV7+1NBss1a0XDWW0mps2V/VwxqFRtVcc+eVR7BOPznJQjBY1/c8w+ri0LyrnvShbnx7ZHLty56eMrRwlQpPobhXYjnOFdScdcAgkD4ZkMIn1X07hlVFjMpUEA81ZIycHcMOb1zvN3h+irrt5URU9kgsFUbMDgbYwJ8r7O63unyc4/1O34zs+NNXrFVWrtYqNmrW3I5h4OuAOg8Z869Otse2t+0avaNEuFisqkJ/VsRvgMFPp0M+edrOIK14WtdlYZ2GMLnI93QToeHL9SqZKKGVWPM7u9WT6nDEkzh79ULbiR/V8uaa4qRNk5bZD27ZJJ8TmeY4T3vGUI4QhRwjgE1uzPFV0lxsZWYGq1MLjOXQqDv4DMypY0eie3n7tc8lb2tuowlY5nbc74Hh1mVb9XaWmyzTX6vTm2+k8trfZldRWEK1tYG/3yEgg4Ibl38MX07Z1LZpWC6l/q9lzl7Bpld+9p7tdqwFBB/ADfwHMabg99opNdZb6wbFpwye0asd54+yBkbnAxk+EXEeE20BGfuylnNyWV21WoxU4cB6yRkHYjrAm49xNNWyXFCt7KBqCOXu7HUAC1R1ViB7Q6ZG3jNXhfbKzTV6Oqouq6d3a4ctJ71Wv7zClgSvs8w8NzOf4dw+3UP3dKF25WbA/lRSzH5D4kgeM9cN4dZqC3dhcIvO7vZWlaJ05nschVG/nA6jQds0VClg1KBb7rqzT9VJZbbDYa7e9U8uD/Eu+/oJzQ4jnVDUuGP2wtYZBJxYHI5sDJ8M4EtU9mNU1rUipedaxac3UBDUSAti2FuVlPMMEH8jPOo7Oaiu1abFqVnTvATqNOE7vLAubOflA9lvHO0eDV13bR701ddwaxLra3qQrSoRE1PelHKgE5QBM7+cscT7UabUJZRjUpXfbQSSmlC0VJZl0rWpckKpOM5Jx065xqeBvVaw1FJZEpN791fTvQfZW6qwEq4DMpA3zgjzxW43oxUyFaba0srV6xawLsmSveNjZeZlYgeWMbbx4Osu49wy1W0rfXV0/IldbYqKV9wbGS9ECl+dy7c2Rk8+4GNszh/aXTqdNqLaLzqtJUlVYWysUuKwwqNmRzqRzHIXrj1M5WEC/wAVoqQUlLOex6xZeQUKK7sSK1x0YLjmBJ3Ph0mfHCUKEcIChHCAoSKzUD+EZPpKTWu5x0Hyk1cd12L7MHiNWq7tgLK+77o52L+0SD6Ecoz/ANZ54TxQ0F9Pqw6FDyspJDL6H9D4jB8Z1H0DsAdUmP8AhMP/AJAfj0nR/Sp2a0eo0z6m9u6spX2blA5jk4Wsj+MMxAAPidsTjekWbrfq+X9pON6VKiunzkjqSx93WcTw0EZsbIQAKD55IHym/wAF7D3amvv0eqxQxRhzNlWXGQy48iCPAgib3aDs0atG3s+1yORt4IvM7egHT3ssUr1W9uzl4TG0mtZNjuPI+HuM1adQr9Dv5HrO2uWJIRwlChHiEaHNXs3xf6nZZYA3M1NtaEBDyu64RiG2IBwT19xmXCZHW6btu4bSWWq1j0fWVtPLSnMl4QDk5RgMoU9Rvt5mUO0nHV1CV1VvqWVCzE3jTKSxAAwlKgDAHXJznwxMGEK6zs3xjR6OgNzav6zawLmkVDulqtDogNgAK2YUsBnZcHHjOnaLSae686UXinV1o1gVae809wsd+RFsUoyjOMbj2tjtOMhA6nX9qK3GowuodrNOmmra1qNqw/PYzrWoAJOMKuwyd/CGi7SUK1Jeqz7PRjTB1WhnrsFjN3tS2ZU7NjfB3M5aEDsrO2lYu71KC+NENKBcKsM4uFneWKgClcb8oAydthvMzivG69ZZS+r+ssU0/duyGoM1oe11YZ25MuNtthsJgQgKEcIQoRwgKEcI0VtVYR92Q8pP3iTPRbJP76Ses5mZlpXrqOc+UnK53Ml5Ysbfv9+cK+j/AEHv9vqE/mqRv8DkZ/zzrvpROdDcLR7PIVTGfauf2a2A8kGX+HpPn/0L6nl4gF/nqsX4go4/BTOr+m+0ijTgZINjkj1CAA58PvH5+sJ9R/Qxw9V0t2oDs7WXWCysYOGRiE3PiVIPlhhNzt5oAvDtXY5BsNeNuijOFRfTJ6+J38gOc+gm/bWV7j267MHHVg6sQPD7izpvpau5OFaj+rulHxuQn8AYPr80smZ6U59Mf32jqM9ovX9+GYVPTq2Gzbjz8f8ArLtVobpM47T1TcFK+pI/T85YlMaUI8Ql1k4RwkUoRwgOtOYgZAyQMk4AycZJ8BLWr4f3a83faZ98YruDN78Y6SpCB0Tdl7F0TXtRqO89iwfY28goLNXjOMFyxD46hFB6NJ/+5h+yH1gc1hAKColq/ZsJFoDbNmm1Aozl05dt8cybmLM5duZwQzczczA4BDN1YHA2PlIuUeQ+UDrU7JgCxTbTnPKhs7ytl3oTJrDdO81AQk7KU6tkCVX7LnlsbnvAr5x9po2QhkqNmbQXPdI45Qjbli2OUYM53lHlDlHkIG1xbgH1Z0RtRWQ91lRYDZBWyIztvt7TNt4cnXfbQ1fAFNr0nTtpVTnNdtnfMblWyuoF+dwnKzW1nnQBRzYwes5UCAUeQgdhX2PFdjK9qEKFz3qW1EFu+YlVDZfC0E4HUWb8uMivX2OZ0LV3MW9gBWoI+0eumwVuyuwQ/bIoJ6sG6AZPL8o8v3+8Rco8h8oGtxzgjaXkLWI4sNnKUOQVQrytn+pXVwPAMM77DE1T4HvkwEocRs3x6fjCoe83Ek0moHNyk77ymFPvlYth8yK6TmngkzIF7npmWKecEFjt4iB1v0eajueI6ZicZsC/4wa/+efSPptqzpqG8rsf4kY/8s+M6TUGu1XHVCGHvU5H4ifavpdcPoKn/hN1Zz4YNb+Hj4QjnvoTfl1V6fzVKf8AC5//AEZufTpquXQog/3ly/JUcn8Ss5T6J9UE4iE8Wpbx9UxLf0/a/NmmpB+6ruw/85Cr/wDQ/OD6+RCTVjH6/v4yvdcAPf8Av8h+MhbVkwqzqbMSC59x6Afjv+sq2XFmAPTxntmycnxhGx/2lFMjmhGjrIQhCCEIQCEIQCEIQCEIQCEIQCEIQCZOrTmYn/TE0r3wpMybCB94/CFhG1mBtiUicNuPhLzOQPZUL6nc/DymcwO7AE+GfU7wNWrUr4bT33y+MxhaR1BlvTnvNgYVfTUg9PD9ifR+0PE++4Bp7e8YlLkrYE/dNYsAI332VSPeJ8talqzk9Dsf0M1H4yw0LaLfB1K3g56YqatgPXPIfgYRv/RjeRxCvk2JBx8eXfPrjp4Sp9JnFvrWutYHIDci+XKnsAj0JHN/6pD2G4gNK9t5xzJU3Jn+ZsBT88fKctrtQSTjqenoPOFV7bOZvQbCJh5QGEHrK72ZhE2m3YmSuJ50CHciS3bnwgQc8c9wgdbCKEIcIoQHCKEBwihAcIoQHCKEBwihAq8QcgAL1P5eZmcK1G7HmMn11hL439nGw+e56CV31Hh9kPe/6CFQ6pmIwdh4KPH3y1pqvsOn8efyH6SjbYRkl09ygk+7PhNhqitAU9QBn35BP4wKCkHYiRvoMb1nBkoTm67ETyyuvqPSFW9NbzgpahBx18DK19JUYJ6bg+YH6ieTp2bBVyff4T1cjhT3m4HiOoPhiBH3pSs5JAYjb3DwPxmcwZjnznq1nfBI2A9kenn6++NBYOghHgaRvGNaQGUf1D857Z26eMsaPTZZeY7kjH5wGtWHcY6M2B8T0kLiX+J4Fp67gHbrn0+Upm9T97b3giBFvCeudf5h84QOphFCVDhFCA4RQgOEUIDhFCA4RQgOEUIGeyDmYEdT+ZnnUaNOU+znyyenxM9azIf4CTYDLI0y9Dw0GwbnC7kH8BmbWqPsN7pU02zj12/WScSPsgZxk/lCKY9oZHUQXVgHDDEEGMMOvj6yw1KuNxn8/gZFOkqdwczzqGJ2xt4/nK50Toc1nPoZJbqso2RysBuIHjmA8B8h6Tw/L54/f/SUn1EjCu/QGVFo21p03P78ZHRYDYrEnYj3AZklfDgoy5yZ4uDZxXygDr8D+UCzx7Z15fvEdPcev78pDpVtb7zMB6Y/MzQ4j7So4xk/qM/KR6ctjO+PhBCDuf6rf8v9o5Z7x/5R8xFCtKEITbAhCEAhCKA4RRwCEIoDhCEAhCECpxBeh94/tI9M2NuolrVJzIwHiJkULg439d/wHlMy1C1a3KQ3qPXxkWtt5n8wNsYHzEVlqgnO+3X+0NFUpG7kH3SDxsPKSV6kA9MSU8P8rB8Qo/SRd0q9TX8XH9oVf0+pVts7yDijpsm3MTgHA2lK3Xon3cE+GM4+JOJSHMSGbJZtx6Dz+cI06tME6gZ/e8mDgStXqs4DfA/pC9WA2hXjUWA+sqMfdG2ZGQxO2PlCNGuzmqUfykr8Nsfv0l0EBfh6zIpUqRzHrt/b4y414I5SCSNug+W0CTvl/nX8I5T5f/D/ABEIVuQhCdGBCEIBCEIBCEIBCEIBCEIBCEIBMfVLyO22x6fHr+s2JX1un7xfUdP7STBCmtPNXnxyfzlNdjNThRypU9QTtPOu0WfaUfCYaZtzs2wO0hTRu3STIrZ2VvkZpIRUvNZsfLx9B74FJeGrUOezLH+FR4nwENPpbGy5wGPh0wPAY8BNHTKSe8sHtH7o/lHl7z4mTuynr185Fc8QQxBHu946yavUMox1Hkf0mlqVrYYZvLGOuR4zLtGCcHPrKiY3o3UEfjPaW1r0zKmIsQJrtQD0UfH5ysr5Ptb56z0ZGBA9d0n7JikfKfX8Y4HUwihOzBwihAcIoQHCKEBwihAcIoQHCKEBwihApapeRw+QObY+/wD0mqmMAiYHHHyVXy3+f+kx9+ntY8t5yt+tw6biPFEr2B5m8gfzPhMis2XNznw6eQ90go0ZO+JbKY/gf4SB2GzxJkRc+JiZx5uPeJE7+sCR2/T9YxmQpueuPnJwg/n/AMr/ANoBAmeWr32b/K28TAgZI/H+8BsZJptI1nTYeJP6ecpNaT0GJ1FScqgeQAmqxqTL1yxwhOmMlCEIBCEJQQhCQEIQgEIQlBCEJAQhCUEIQkGRxL759w/KVausITjP63DRpksIQqDU9JkW9YQhJCyUQhAJ5sjhAiPUTqoQm6fWbCEITaP/2Q=="
            className={styles["logo"]}
          />
        </div>
      </footer>
    </div>
  );
}
