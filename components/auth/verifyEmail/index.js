import React from 'react'
export default function VerifyEmailComponent({data}) {

  return (
    <>
        {
            data?.status === "success" ?
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">Tebrikler!</h4>
                            <p>{data?.message}</p>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                            <h4 className="alert-heading">Hata!</h4>
                            <p>{data?.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
  )
}
