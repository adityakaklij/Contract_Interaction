import React from 'react'

function Post({data1, data2}) {
  return (
    <div>
        <h3>{data1}</h3>
        <div>
            <p>Tweet:- {data2}</p>
        </div>
    </div>
  )
}

export default Post