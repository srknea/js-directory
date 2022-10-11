// Arayüz elementleri seçelim
const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('mail');

const form = document.getElementById('form-rehber');

const kisiListesi = document.querySelector('.kisi-listesi')

// event listenerların tanımlanması
//kaydet
form.addEventListener('submit', e =>{
    e.preventDefault();
    const eklenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value 
    }
    
    const kontrol = verileriKontrolEt(eklenecekKisi);
    if(kontrol.durum){
        kisiyiEkle(eklenecekKisi);
    }else{
        bilgiOluştur(kontrol.mesaj, kontrol.durum);
    }

    //console.log(eklenecekKisi);

});

//kisi işlemlerini yap
kisiListesi.addEventListener('click', e =>{
    //console.log(e.target);
    
    if(e.target.classList.contains('btn--delete')){
        //console.log("Silme");
        const silinecekTr = e.target.parentElement.parentElement;
        const silinecekTrMail = e.target.parentElement.previousElementSibling.textContent; //butonun parent'ına gittik sonra ondan bir önceki elemente gittik ve maili bulduk
        rehberdenSil(silinecekTr,silinecekTrMail); //argüman olarak tr 'yi yolladık
    } else if(e.target.classList.contains('btn--edit')){
        //console.log("Düzenleme");

    } 
})

function rehberdenSil(silinecekTrElementi, silinecekTrMaili){
    silinecekTrElementi.remove();
    //console.log(silinecekTrElementi);
    //console.log(silinecekTrMaili);

    //maile göre diziden silme işlemi
    tumKisilerDizisi.forEach((kisi, index) =>{
        if(kisi.mail === silinecekTrMaili){
            tumKisilerDizisi.splice(index,1);
            //console.log(tumKisilerDizisi);
        }
    });
}
    
// tüm kişiler için dizi
const tumKisilerDizisi = [];

function kisiyiEkle(object){
    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.innerHTML = ` 
        <td>${object.ad}</td>
        <td>${object.soyad}</td>
        <td>${object.mail}</td>    
        <td>
            <button class="btn btn--edit"><i class="far fa-edit"></i></button>
            <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
        </td>
    `;

    kisiListesi.appendChild(olusturulanTrElementi);
    
    tumKisilerDizisi.push(object);

    bilgiOluştur('Kisi rehbere kaydedildi.', true);
    //console.log(tumKisilerDizisi);
}

function verileriKontrolEt(kisi){
    //hata kontrolu
    for(const key in kisi){ //objelerde in kullanımı
        //console.log(kisi[deger]);
        if(kisi[key]){
            //console.log(kisi[key]);
        }else{
            const sonuc = {
                durum: false,
                mesaj: 'Boş alan bırakmayınız !'
            }
            return sonuc;
        }
    }
    //hata yoksa inputları temizle sonra return yap
    clearInputs();
    
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
        olusturulanBilgi.classList.add('bilgi--success');
    }else{
        olusturulanBilgi.classList.add('bilgi--error');
    }
    //olusturulanBilgi.classList.add(durum ? 'bilgi--succes' : 'bilgi--error');

    document.querySelector('.container').insertBefore(olusturulanBilgi, form);

    // bilgi div' inin silinmesi
    setTimeout(function(){
        const silinecekDiv = document.querySelector('.bilgi');
        if(silinecekDiv){
            silinecekDiv.remove();
        }
    },2000)    
}

//kayıt 
function clearInputs() {
    ad.value = '';
    soyad.value = '';
    mail.value = '';
}