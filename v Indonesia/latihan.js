document.getElementById('loan-form').addEventListener('submit', menghitung);

function menghitung(e) {
    const pinjaman = document.getElementById('pinjaman');
    const bunga = document.getElementById('bunga');
    const tahun = document.getElementById('tahun');

    const tagihanPerbulan = document.getElementById('tagihan-perbulan');
    const totalPembayaran = document.getElementById('total-pembayaran');
    const totalBunga = document.getElementById('total-bunga');

    const jmlPinjaman = parseFloat(pinjaman.value);
    const perhitunganBunga = parseFloat(bunga.value) /100 /12;
    const perhitunganTahun = parseFloat(tahun.value) * 12;

    const x = Math.pow( 1 + perhitunganBunga, perhitunganTahun);
    const perbulan = ( jmlPinjaman * perhitunganBunga ) / ( x - 1);

    if(isFinite( perbulan )) {
        tagihanPerbulan.value = perbulan.toFixed(2);
        totalPembayaran.value = ( perbulan * perhitunganTahun).toFixed(2);
        totalBunga.value = (( perbulan * perhitunganTahun ) - jmlPinjaman).toFixed(2);
    } else showError('Tolong cek kembali angka yang anda masukkan');

    console.log(22);
    e.preventDefault();
}

function showError(error) {
    const divError = document.createElement('div');
    const card = document.querySelector('.card');
    const h1 = document.querySelector('.heading');

    divError.className = 'alert alert-danger';
    divError.appendChild(document.createTextNode(error));
    card.insertBefore(divError, h1);
    setTimeout(()=> {
        document.querySelector('.alert').remove();
    }, 2000);
}