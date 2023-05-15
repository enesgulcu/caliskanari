


 

  const currentTime = new Date().getTime();
    const oneWeekLater = currentTime + (1000 * 60 * 60 * 24 * 7);

    interface DataConfig {
        name: string;
        updateTime: string;
        endTime: string;
        isNewData: boolean;
      }

const allDataConfig:DataConfig[] = [
    // bu alana cookie kullanan ve verilerini düzenli kontrol ettirmek istediğiniz verileri ekleyebilirsiniz.
    {
        name: "generalTopPageBanner",
        updateTime: "generalTopPageBanner",
        endTime: "generalTopPageBanner",
        isNewData: false,
    },
    {
        name: "generalTopPageBanner2",
        updateTime: "generalTopPageBanner2",
        endTime: "generalTopPageBanner2",
        isNewData: true,
    },
    {
        name: "generalTopPageBanner3",
        updateTime: "generalTopPageBanner3",
        endTime: "generalTopPageBanner3",
        isNewData: false,
    },
    {
        name: "generalTopPageBanner4",
        updateTime: "generalTopPageBanner4",
        endTime: "generalTopPageBanner4",
        isNewData: true,
    },
]

const dataUpdateConfig = () => {
    const ConfigData = JSON.stringify(allDataConfig);
    return ConfigData;

    
}

export default dataUpdateConfig
