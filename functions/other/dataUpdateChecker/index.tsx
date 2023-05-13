import {getAPI} from "@/services/fetchAPI";

// BU FONKSİYON: backend'de bir veri güncellendiğinde ve veri tabanına yeni bir veri girişi olduğunda...;
// çalışır ve hangi verinin güncellendiğini veri tabanından alır ve getirir.
// güncelleme yapılan verinin "cookie - localstorage" kaydını siler.
// sebebi: kayıt silindiğinde component kayda ulaşamaz ve güncel veriyi tekrar veritabanından istek atarak çekebilir.
// böylelikle verilerin güncelliği sağlanmış olunur.

const DataUpdateChecker = async ():Promise<any> => {
  try {
    
    getAPI("/other/dataUpdateChecker").then((res) => {

        // BURADA VERİ TABANINDAN GELEN GÜNCELLEME RAPORUNU ALIP KONTROLLERİNİ YAPACAĞIZ...
    })
        
     
  } catch (error) {
        return error;
  }
}

export default DataUpdateChecker
