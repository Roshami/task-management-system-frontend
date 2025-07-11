const TaskCard = () => {
    
    return (
        <div className="bg-gray-200 p-4 w-full rounded-lg">
            <div className="flex justify-between">
                <h1>Task Title</h1>
                <p>Created Date</p>
                
            </div>
            <div className="flex justify-between">
                <p>Task Description</p>
                <div className="flex flex-col">
                    <p><span>Start :</span> <span>Date</span></p>
                <p><span>End :</span> <span>Date</span></p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full gap-2"></div>
                <p>Task Status</p>
            </div>
        </div>
    )
}

export default TaskCard