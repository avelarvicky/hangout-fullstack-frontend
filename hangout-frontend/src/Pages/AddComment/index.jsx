import { useState } from "react";

import hangoutsService from "../../Services/hangout.service";
import { useParams } from "react-router-dom";

function AddComment(props) {
	const { hangoutId } = useParams();
	const [content, setContent] = useState("");

	const handleSubmit = (e) => {
		
			e.preventDefault();

			const requestBody = { content };

			hangoutsService.createComment(hangoutId, requestBody)
        .then(()=> {
          setContent("");
          props.refreshHangout();
        })
        .catch((error)=> {
          console.log(error)
        })
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Add Comment</label>

				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<button type="submit">Post</button>
			</form>
		</div>
	);
}

export default AddComment;
