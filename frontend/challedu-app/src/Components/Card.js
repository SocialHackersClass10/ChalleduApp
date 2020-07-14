import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ role, infos }) => {

    return role === "user" ? <div className="col-lg-3 col-md-6">
        <div className="card mt-3">
            <Link to={`/user/${infos._id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                <div className="card-body text-center ">
                    <img className="card-img" src={infos.image} alt={infos.full_name} />
                    <h4 className="card-title ">{infos.full_name}</h4>
                    <h5>{infos.title}</h5>
                </div>
            </Link>
        </div>
    </div>
        : <div className="col-lg-3 col-md-6">
            <div className="card mt-3">
                <Link to={`/ngo/${infos._id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                    <div className="card-body text-center ">
                        <img className="card-img" src={infos.image} alt={infos.name} />
                        <h4 className="card-title ">{infos.name}</h4>
                        <h5>{infos.main_representative}</h5>
                    </div>
                </Link>
            </div>
        </div>

}

export default Card;