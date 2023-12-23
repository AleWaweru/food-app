"use client";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "../components/layout/Useprofile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "@/app/components/DeleteButton";

export default function Categories() {
  const { loading: profileLoading, data: profileData } = useProfile();

  const [CategoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleNewCategory(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: CategoryName };

      if (editCategory) {
        data._id = editCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      setCategoryName("");
      fetchCategories();
      setEditCategory(null);

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editCategory
        ? "Category Updating..."
        : "Creating new Category...",
      success: editCategory ? "Category Updated..." : "Category created",
      error: (errorDetails) => {
        // Handle the error message based on errorDetails
        console.error("Error saving category:", errorDetails);
        return "category save failed.";
      },
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });

      console.log(response);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  }

  // Loading state
  if (profileLoading) {
    return "Loading user info...";
  }

  // Not an admin
  if (!profileData.admin) {
    return "Not an Admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isadmin={true} />
      <form onSubmit={handleNewCategory} className="mt-8">
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editCategory ? "Update Category" : "New Category name"}
              {editCategory && (
                <>
                  : <b>{editCategory.name}</b>
                </>
              )}
            </label>
            <input
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
            />
          </div>
          <div className="pb-4 flex gap-2">
            <button type="submit">{editCategory ? "Update" : "Create"}</button>
            <button
              type="button"
              onClick={() => {
                setEditCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="mt-8 text-sm text-gray-500">List of Categories</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
              key={c.id}
            >
              <div className="grow ">{c.name}</div>
              <div className="gap-1 flex ">
                <button
                  type="button"
                  onClick={() => {
                    setEditCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton label="Delete"
                onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
