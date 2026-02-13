import React from 'react'


const page = () => {

    const options = [
        { "id": 1, "name": 'Courses', "Link": "localhost:3000/pages/courses" },
        { "id": 2, "name": 'Assignments', "Link": "localhost:3000/pages/assignments" },
        { "id": 3, "name": 'Results', "Link": "localhost:3000/pages/results" },
        { "id": 4, "name": 'Attendance', "Link": "localhost:3000/pages/attendance" },
    ]

    return (
        <div className='h-100vwh'>
            <section>
                <div className='w-100vw border-1 h-[10vh] flex items-center justify-between'>
                    <img src="https://ggu.edu.in/wp-content/uploads/2025/03/ggu-new-logo.png" alt="" className=" h-[5vh] m-3 " />

                    <button className='m-10 border-red-600-1 text-white p-2 w-[8vw] rounded-2xl bg-red-600'>SignOut</button>
                </div>
            </section>
            <section className='w-full flex justify-evenly align-middle items-center'>

                <div className=' h-[60vh] m-20 w-1/2 flex'>
                    <div className='border-1 h-[100%] w-1/2'>

                    </div>

                    <div className='h-[100%] border-1 border-l-0 w-1/2'>

                    </div>

                </div>

                <div className='grid grid-cols-2 gap-10 align-cen '>
                    {
                        options.map((item) => {
                            return <div className='p-10 border-1' key={item.id}>
                                <p>{item.name}</p>
                            </div>
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default page
