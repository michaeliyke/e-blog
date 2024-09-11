export function Comments() {
return (
	<div className="mt-8">
			<h2 className="text-2xl font-bold mb-4">Comments</h2>
			<div className="space-y-4">

				{/* Comment box */}
				<div className="flex space-x-4">
					<div className="flex-grow">
						<textarea className="w-full h-20 p-2 border border-gray-300 rounded" placeholder="Write a comment..."></textarea>
						<button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
					</div>
				</div>

				{/* Dummy comments */}
				<div className="flex space-x-4">
					<div className="flex-shrink-0">
						<img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/50" alt="User Avatar" />
					</div>
					<div className="flex-grow">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium">John Doe</h3>
							<button className="text-blue-500 hover:underline">Reply</button>
						</div>
						<p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae metus ac nisl hendrerit lacinia. Nulla facilisi.</p>
					</div>
				</div>
				<div className="flex space-x-4">
					<div className="flex-shrink-0">
						<img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/50" alt="User Avatar" />
					</div>
					<div className="flex-grow">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium">Jane Smith</h3>
							<button className="text-blue-500 hover:underline">Reply</button>
						</div>
						<p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae metus ac nisl hendrerit lacinia. Nulla facilisi.</p>
					</div>
				</div>

			</div>
		</div>
)};
