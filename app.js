class Data {
    constructor(nama, tknDrh, glukosa, kolestrol, asmUrt, tgl) {
        this.nama = nama;
        this.tknDrh = tknDrh;
        this.glukosa = glukosa;
        this.kolestrol = kolestrol;
        this.asmUrt = asmUrt;
        this.tgl = tgl;
    }
}

class UI {
    static BuatTable(data) {
        const tbody = document.querySelector('.list');
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${data.nama}</td>
        <td>${data.tgl}</td>
        <td>${data.tknDrh}</td>
        <td>${data.glukosa}</td>
        <td>${data.kolestrol}</td>
        <td>${data.asmUrt}</td>
        <td ><i id="delete" class="bi bi-x-circle-fill"></i></td>
        `;
        tbody.appendChild(tr);
    }

    static ShowAlert(msg, className) {
        const div = document.createElement('div'),
            card = document.querySelector('.card'),
            h1 = document.querySelector('.heading');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));
        card.insertBefore(div, h1)
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2500);
    }

    static ClearInput() {
        document.querySelector('.nama').value = '';
        document.querySelector('.tekanan-darah').value = '';
        document.querySelector('.gula-darah').value = '';
        document.querySelector('.kolestrol').value = '';
        document.querySelector('.asam-urat').value = '';
        document.querySelector('.tanggal').value = '';
    }

    static Remove(target) {
        if (target.id === 'delete') target.parentElement.parentElement.remove();
    }
}

class Store {
    static setPerson() {
        let data;
        if (localStorage.getItem('person') == null) data = [];
        else {
            data = JSON.parse(localStorage.getItem('person'));
        }
        return data;
    }

    static DispalyPerson() {
        const person = Store.setPerson();
        person.forEach(date => {
            UI.BuatTable(date);
        });
    }

    static addPerson(data) {
        const person = Store.setPerson();
        person.push(data);
        localStorage.setItem('person', JSON.stringify(person));
    }

    static Remove(asmUrt) {
        const person = Store.setPerson();
        person.forEach((data, index) => {
            if (data.asmUrt == asmUrt) person.splice(index, 1);
        });
        localStorage.setItem('person', JSON.stringify(person));
    }
}

document.addEventListener('DOMContentLoaded', Store.DispalyPerson)

document.querySelector('.konvensi').addEventListener('submit', (e) => {
    addDate();

    e.preventDefault();
});

function addDate() {
    const nama = document.querySelector('.nama').value,
        tknDrh = document.querySelector('.tekanan-darah').value,
        glukosa = document.querySelector('.gula-darah').value,
        kolestrol = document.querySelector('.kolestrol').value,
        asmUrt = document.querySelector('.asam-urat').value,
        tgl = document.querySelector('.tanggal').value,

        data = new Data(nama, tknDrh, glukosa, kolestrol, asmUrt, tgl);
    if (nama, tknDrh, glukosa, kolestrol, asmUrt, tgl == '') {
        UI.ShowAlert('Data yang di input invalid', 'alert-danger');
    } else {
        UI.BuatTable(data);
        Store.addPerson(data);
        UI.ClearInput();
        UI.ShowAlert('Data berhasil di simpan', 'alert-success');
    }
};

document.querySelector('.list').addEventListener('click', (e) => {
    UI.Remove(e.target);
    Store.Remove(e.target.parentElement.previousElementSibling.textContent) //previousElementSibling
    e.preventDefault();
})