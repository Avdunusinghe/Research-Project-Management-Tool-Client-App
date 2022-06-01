import "./carousel.scss";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

// const MyCollection = [
// 	{
// 		label: "First Picture",
// 		imgPath: "https://media.geeksforgeeks.org/wp-content/uploads/20210208000010/1.png",
// 	},
// 	{
// 		label: "Second Picture",
// 		imgPath: "https://media.geeksforgeeks.org/wp-content/uploads/20210208000009/2.png",
// 	},
// 	{
// 		label: "Third Picture",
// 		imgPath: "https://media.geeksforgeeks.org/wp-content/uploads/20210208000008/3.png",
// 	},
// ];

function CaroselSlider() {
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<Carousel>
							<Carousel.Item className="CarouselAlignment image">
								<p className="d-block w-100 " alt="First slide" />
							</Carousel.Item>
							<Carousel.Item className="CarouselAlignment image1">
								<p className="d-block w-100" alt="Second slide" />
							</Carousel.Item>
							<Carousel.Item className="CarouselAlignment image2">
								<p className="d-block w-100" alt="Third slide" />
							</Carousel.Item>
							<Carousel.Item className="CarouselAlignment image3">
								<p className="d-block w-100 " alt="First slide" />
							</Carousel.Item>
							<Carousel.Item className="CarouselAlignment image4">
								<p className="d-block w-100" alt="Second slide" />
							</Carousel.Item>
							<Carousel.Item className="CarouselAlignment image5">
								<p className="d-block w-100" alt="Third slide" />
							</Carousel.Item>
							<Carousel.Item className="CarouselAlignment image6">
								<p className="d-block w-100" alt="Third slide" />
							</Carousel.Item>
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CaroselSlider;
