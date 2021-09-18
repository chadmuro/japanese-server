import { Request, Response } from 'express';
import { GetCategoryResponse } from '../routes/categoryRoutes';
import Category from '../models/category';
import Vocabulary from '../models/vocabulary';

const category_get_all = async (req: Request, res: Response) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const category_get = async (req: Request, res: GetCategoryResponse) => {
  res.json(res.category);
};

const category_post = async (req: Request, res: Response) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const category_delete = async (req: Request, res: GetCategoryResponse) => {
  try {
    if (res.category) {
      await res.category.remove();
      await Vocabulary.updateMany(
        { _id: res.category.vocabularies },
        { $pull: { categories: res.category._id } }
      );
      res.json({ message: 'Deleted category' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  category_get_all,
  category_get,
  category_post,
  category_delete,
};
