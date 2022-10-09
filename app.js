// Arayüz elementleri seçelim
const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('mail');

const form = document.getElementById('form-rehber');

// event listenerların tanımlanması
form.addEventListener('submit', e =>{
    e.preventDefault();
    const eklenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value 
    }
    
    const kontrol = verileriKontrolEt(eklenecekKisi);
    if(kontrol.durum){
        console.log("Sorun yok..");
    }else{
        bilgiOluştur(kontrol.mesaj, kontrol.durum);
    }

    //console.log(eklenecekKisi);

});

function verileriKontrolEt(kisi){
    //objelerde in kullanımı
    for(const key in kisi){
        //console.log(kisi[deger]);
        if(kisi[key]){
            //console.log(kisi[key]);
        }else{
            const sonuc = {
                durum: false,
                mesaj: 'Boş alan bırakmayınız...'
            }
            return sonuc;
        }
    }
    return {
        durum: true,
        mesaj: ''
    }
}

function bilgiOluştur(mesaj, durum){
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'bilgi';
    
    if(durum){
        olusturulanBilgi.classList.add('bilgi--succes');
    }else{
        olusturulanBilgi.classList.add('bilgi--error');
    }
    //olusturulanBilgi.classList.add(durum ? 'bilgi--succes' : 'bilgi--error');


    document.querySelector('.container').insertBefore(olusturulanBilgi, form);

}