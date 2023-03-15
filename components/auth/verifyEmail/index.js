import React from 'react'
export default function VerifyEmailComponent({status, error, message}) {

  return (
    <>
        {
            status === "success" ?
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">Tebrikler! Mailiniz Onaylandı.</h4>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                            <h4 className="alert-heading">HATA</h4>
                            <p>{error ? error : message}</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
  )
}
