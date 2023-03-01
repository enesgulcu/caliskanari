## Mongo Db
Login mail: caliskanariyayinlari@gmail.com

Username: caliskanari
Password: 922okulnumaramM

Cluster Name: caliskanAriCluster
Database Name: caliskanaridb
## _______________________________________________
kayıt olma adımları

## Kim olarak kayıt oluyorsunuz ? ( öğrenci | öğretmen | veli | bayi )
[öğrenci]
- name
- surname
- age
-------------------
- phone
- city
- state
- neighborhood
-------------------
- class
-------------------
- e-mail
- password
- password verify
-------------------

[öğretmen]
- name
- surname
-------------------
- phone
- city
- state
- neighborhood
-------------------
- departman
-------------------
- e-mail
- password
- password verify
-------------------

[Veli]
// Bu daha sonra entegre edilecek
- name
- surname
-------------------
- phone
- city
- state
- neighborhood
-------------------
- student Name (select)
-------------------
- e-mail
- password
- password verify
-------------------

[Business]
// Bu daha sonra entegre edilecek
- name
- surname
-------------------
- phone
- city
- state
- neighborhood
- street
- No
-------------------
- e-mail
- password
- password verify
-------------------


## YAPILACAKLAR

- formik password lar butona basıldığı anda gitmiyor 2. basışta yada veri girildiğinde siliniyor. böyle de kullanılabilir ama ilk basışta gitse daha iyi.

- middleware içinde: kullanıcı eğer giriş yapmış ise bir session var ise login ya da register bölümlerine girememeli. bunu engellemeliyiz.

- öğretmen kayıt olma ve giriş sayfaları yapılacak.



<!-- var X = document.querySelectorAll('tr > td > a')
var Y = [];

var counter = 0;
for(var i = 0; i < X.length ; i++){
    
    var Z = document.querySelectorAll('tr > td > a')[i].innerText
    if(Z){
        Y[counter] = Z.split(' - ').map(element => element.trim());
        counter++;
    }
}



var myJsonString = JSON.stringify(Y);

console.log(myJsonString); -->