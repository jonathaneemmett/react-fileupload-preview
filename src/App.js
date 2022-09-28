import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [imagePreview, setImagePreview] = useState(null);
	const [fileList, setFileList] = useState([]);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [ratio, setRatio] = useState(0);
	// Notes: will need to set an imagePreview state and file list state to handle preview and upload.

	const handleDrop = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const list = e.dataTransfer.files;
		if (list.length > 0) {
			const file = list[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				let image = new Image();
				image.src = e.target.result;
				image.onload = () => {
					setWidth((image.width / 96).toFixed(2));
					setHeight((image.height / 96).toFixed(2));

					let ratio = image.width / image.height;
					setRatio(ratio);
				};
				setImagePreview(e.target.result);
			};
			reader.readAsDataURL(file);
			setFileList(list);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = 'copy';
	};

	const handleDelete = () => {
		setImagePreview(null);
	};

	return (
		<div className='container'>
			<div style={{ position: 'relative', width: '400px', height: 'auto' }}>
				{imagePreview && (
					<>
						<div style={{ postion: 'absolute', width: '400px', height: '100%' }}>
							<img src={imagePreview} alt='preview' style={{ position: 'relative', width: '100%' }} />
							<div className='delete' onClick={() => handleDelete()}>
								x
							</div>
						</div>
					</>
				)}
			</div>
			<div className='dropZone' id='dropzone' onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleDragOver(e)}>
				<p>
					Drag one or more files to this <i>drop zone</i>.
				</p>
			</div>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'row',
					width: '400px',
					gap: '10px',
					fontSize: '16px',
					marginTop: '20px',
				}}>
				<span>width(in): {width}</span>
				<span>height(in): {height}</span>
				<span>ratio: {ratio}</span>
			</div>
		</div>
	);
}

export default App;
