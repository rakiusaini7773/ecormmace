import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdOutlineFileOpen } from 'react-icons/md';
import * as Yup from 'yup';
import BaseApiManager from '../networking/baseAPIManager';
import { API_ENDPOINTS } from '../networking/apiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '../components/common/Table';
import BlogModal from '../components/BlogModal';
import Loader from '../components/common/Loading';


const blogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author name is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.mixed().required('Image is required'),
});

const AddBlogForm = () => {
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef(null);
  const [imageName, setImageName] = useState('');
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    title: '',
    author: '',
    category: '',
    readMoreLink: '',
    description: '',
    image: null,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_BLOGS);
      // Add full URL if necessary
      const processed = response.map((blog) => ({
        ...blog,
        image: blog.image?.startsWith('http')
          ? blog.image
          : `${process.env.REACT_APP_BASE_URL}/uploads/${blog.image}`, // adjust this line if needed
      }));
      setBlogs(processed);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('category', values.category);
    formData.append('readMoreLink', values.readMoreLink);
    formData.append('description', values.description);
    formData.append('image', values.image);

    try {
       setLoading(true); // Start loading
      await BaseApiManager.post(API_ENDPOINTS.ADD_BLOG, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Blog added successfully!');
      resetForm();
      setImageName('');
      fetchBlogs();
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error('Failed to add blog');
    }finally {
    setLoading(false); // End loading
  }
  };

  const columns = [
    { Header: 'Title', accessor: 'title' },
    { Header: 'Author', accessor: 'author' },
    { Header: 'Category', accessor: 'category' },
    {
      Header: 'Short Description',
      accessor: 'description',
      Cell: ({ row }) => (
        <span>
          {(row.original.description || '').substring(0, 100)}...
        </span>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button
          onClick={() => {
            setSelectedBlog(row.original);
            setIsModalOpen(true);
          }}
          className="bg-[#454545] text-white text-sm rounded-full px-6 py-2 w-[125px] h-[45px] flex items-center justify-center"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="w-full bg-white p-6 rounded-xl shadow-md mt-5">
        <h2 className="text-lg font-semibold mb-6">Add Blog</h2>
        <Formik initialValues={initialValues} validationSchema={blogSchema} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">Blog Title</label>
                <Field
                  name="title"
                  placeholder="Enter blog post title"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm mb-1">Author Name</label>
                <Field
                  name="author"
                  placeholder="Author name"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />
                <ErrorMessage name="author" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm mb-1">Category</label>
                <Field as="select" name="category" className="w-full border border-gray-300 rounded-md p-2">
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm mb-1">Read More Link (optional)</label>
                <Field
                  name="readMoreLink"
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Upload Blog Image</label>
                <div className="flex items-center gap-2">
                  <input
                    ref={imageInputRef}
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      setFieldValue('image', e.currentTarget.files[0]);
                      setImageName(e.currentTarget.files[0]?.name || '');
                    }}
                  />
                  <input
                    type="text"
                    readOnly
                    value={imageName}
                    placeholder="Choose file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
                  >
                    <MdOutlineFileOpen className="text-2xl" />
                  </button>
                </div>
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm mb-1">Short Description</label>
                <Field
                  name="description"
                  placeholder="Enter a short description"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Add Blog
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-10">
        <Table columns={columns} data={blogs} title="All Blogs" />
      </div>

      {/* Blog Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blog={selectedBlog}
      />
      {loading && <Loader />}
    </>
  );
};

export default AddBlogForm;
