import {getAPI, postAPI} from "@/services/fetchAPI";
import dataUpdateConfig from "./dataUpdateConfig"




const findNewData = (data:any) => {
  const newData = Object.keys(data).reduce((acc:any, key) => {
    if (data[key].isNewData === true) {
      acc.push(data[key]);
    }
    return acc;
  }, []);
  
  return newData;
};

// BU FONKSİYON: backend'de bir veri güncellendiğinde ve veri tabanına yeni bir veri girişi olduğunda...;
// çalışır ve hangi verinin güncellendiğini veri tabanından alır ve getirir.
// güncelleme yapılan verinin "cookie - localstorage" kaydını siler.
// sebebi: kayıt silindiğinde component kayda ulaşamaz ve güncel veriyi tekrar veritabanından istek atarak çekebilir.
// böylelikle verilerin güncelliği sağlanmış olunur.

const DataUpdateChecker = async ():Promise<any> => {

  // tüm güncelleştirmelerin ve kayıtların üzerinde barındırdığı config dosyasını alıyoruz.
  // NOT: Eğer güncelliği takip edilmesi gereken yeni bir veri eklenirse, "dataUpdateConfig.tsx" dosyasına eklenmelidir!
  const DataConfig = dataUpdateConfig();

  try {
    
    // api ile veri tabanından güncelleme raporunu alıyoruz...
    getAPI("/other/dataUpdateChecker").then(async (res) => {

      if(res.status === "success" && res.data[0]){
        // gelen json değeri parse ederek objeye çevirdik ve veriyi içinden aldık.
        const data = JSON.parse(res.data[0].Configdata);
        
        const checkedStatus = findNewData(data);
        checkedStatus.map((item:any) => {
          // eğer veri güncellendi ise cookie ve Localstorage kaydını sil.
          if(item.isNewData === true){
            

            // veri tabanındaki dataUpdateChecker değerlerini false yap ve değerlerini güncelle.
            const process = {
              data: DataConfig,
              process: "updateData"
            }

            postAPI("/other/dataUpdateChecker", process).then((res) => {
              return true;
            }
            )



          }
        })
        
          // alınan verileri bak -> 
          //güncelleştirme olan verileri bul ->
          // cookie kaydını sil ->
          // veri tabanındaki dataUpdateChecker değerlerini false yap ve değerlerini güncelle.   
          
      }

      // eğer veri yoksa burası çalışır...
      else{
        //eğer veri tabanından veri çekilemez veya hata oluşur ise eski veriyi silip yeniden sıfır veri ile başlatıyoruz.
        // apiye yeniden ekleme işlemi için POST isteği atıyoruz.
        
        const process = {
          data: DataConfig,
          process: "createData"
        }
        // postAPI("/other/dataUpdateChecker", process).then((res) => {
        //     return true;
        // })
      }
    })  
  } catch (error) {
        return error;
  }
}

export default DataUpdateChecker
