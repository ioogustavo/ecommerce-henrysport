import React, { useState, useEffect } from 'react'


export default function SearchCategoria() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const [currentäge, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(productos => {
        setPosts(productos)
        setLoading(false)
      })
      .catch(error => {
        return error;
      })
  }, [])

  return (
    <div>

    </div>
  )

}