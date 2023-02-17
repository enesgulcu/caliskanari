// Öğrenci kayıt işlemleri için kullanılan servis
export function createStudent(newStudent){
    // delete kodu uygun bir yere taşınmalı
    delete newStudent.passwordConfirm;
    console.log(newStudent)
    fetch ('http://localhost:3000/api/auth/register/student',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
        
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

}