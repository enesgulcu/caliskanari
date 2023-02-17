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
- school
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
- school
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
- prisma email "uniq" verilmesine rağmen ayn ıveriden birçok kez oluşturabildik kontrol edilecek.

- hata mesajları düzgün değil planlanacak ayarlanacak (kayıt bölümünde mail eşleşme hata mesajını toasty ile yap).

- services - auth - student - register.js -> 1. satırda passwordConfirm silme kodu eklenmeli.
 delete newStudent.passwordConfirm; -> passwordConfirm (veri tabanında yok) ama biz göndermeye çalıştığımızda hata alıyoruz obje içinden kontrolden sonra silinmeli.


