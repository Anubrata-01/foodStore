// import React from 'react'
import "./shimmer.css"
const ShimmerEffect = () => {
  return (
		<div>
			<div className="main-home-shimmer">
				<div className="outer_circle">
					<div className="inner_circle">
						<i className="fa-solid fa-pizza-slice fa-fade"></i>
					</div>
				</div>
				<h2>Looking for great food near you ...</h2>
			</div>

			<div className="body-box-res body-box">
				<div className="main-header-box">
					<div className="box-shimmer big-header-home"></div>
					<div className="main-header-filter">
						{Array(5)
							.fill("")
							.map((elem, idx) => {
								return (
									<button
										className="shimmer-fbtn"
										key={"shim-fil" + idx}
									></button>
								);
							})}
					</div>
					<div className="main-card">
						{Array(8)
							.fill("")
							.map((elem, idx) => {
								return (
									<div
										className="shimmer card"
										key={"shimmer-menu" + idx}
									>
										<div className="img-box img-shimmer"></div>
										<div className="box-shimmer big-shimmer"></div>
										<div className="box-shimmer"></div>
										<div className="box-shimmer"></div>
										<div className="box-shimmer"></div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ShimmerEffect;