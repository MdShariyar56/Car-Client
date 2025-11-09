import React from 'react';
import { useLoaderData } from 'react-router';
import LoadingSpninner from '../Components/LoadingSpninner';

const Home = () => {

    const data = useLoaderData()
    console.log(data)

     if (!data || data.length === 0) {
    return <LoadingSpninner />;
  }

    return (
        <div>
           {data.map(car => (<div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img
            src={car.image}
            alt="car" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
        </div>))}
        </div>
    );
};

export default Home;