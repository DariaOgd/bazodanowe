import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";
import { v4 as uuidv4 } from 'uuid';

export const createConversation = async (req, res, next) => {
  const userId = req.userId;
  const to = req.body.to;

  if (userId === to) {
    return next(createError(403, "You cannot message yourself!"));
  }

  try {
    const existingConversation = await Conversation.findOne({
      $or: [
        { sellerId: userId, buyerId: to },
        { sellerId: to, buyerId: userId }
      ]
    });

    if (existingConversation) {
      return res.status(200).send(existingConversation);
    }

    const newConversation = new Conversation({
      id: uuidv4(), // Use uuid for unique conversation ID
      sellerId: userId,
      buyerId: to,
    });

    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const userId = req.userId; // ID of the logged-in user
    const conversations = await Conversation.find({
      $or: [
        { sellerId: userId },
        { buyerId: userId }
      ]
    })
    .populate({ path: 'sellerId', select: 'name' })
    .populate({ path: 'buyerId', select: 'name' })
    .sort({ updatedAt: -1 });

    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
