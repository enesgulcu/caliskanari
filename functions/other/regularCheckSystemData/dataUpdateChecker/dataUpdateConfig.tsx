


 

  const currentTime = new Date().getTime();
    const oneWeekLater = currentTime + (1000 * 60 * 60 * 24 * 7);

    interface DataConfig {
        name: string;
        updateTime: string;
        endTime: string;
        isNewData: boolean;
      }

const allDataConfig:DataConfig[] = [
    // bu alana cookie ve localstorage'da kullanan düzenli kontrol ettirmek istediğiniz verileri ekleyebilirsiniz.
    // isNewData: true ise veri yeni eklenmiş demektir. fonksiyon bunu kontrol eder ve yenileme işleminden sonra veri tabanına kaydeder.
    {
        name: "GeneralTopPageBanner",
        updateTime: "GeneralTopPageBanner",
        endTime: "GeneralTopPageBanner",
        isNewData: true,
    }

]

const dataUpdateConfig = () => {
    const ConfigData = JSON.stringify(allDataConfig);
    return ConfigData;

    
}

export default dataUpdateConfig
