import Url from "../models/urlModel.js";
import Click from "../models/clickModel.js";
import Log from "../../LoggingMiddleware/LoggMiddleware.js";

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    if (!url) {
      await Log("backend", "error", "controller", "Original URL missing in request");
      return res.status(400).json({ error: "Original URL is required" });
    }

    const minutes = validity && Number.isInteger(validity) ? validity : 30;
    const expiry = new Date(Date.now() + minutes * 60 * 1000);

    let finalCode = shortcode;
    const exists = await Url.findOne({ shortcode: finalCode });
    if (exists) {
      await Log("backend", "warn", "controller", `Shortcode ${finalCode} already exists`);
      return res.status(400).json({ error: "Shortcode already in use" });
    }

    const newUrl = await Url.create({
      originalUrl: url,
      shortcode: finalCode,
      expiry,
    });

    await Log("backend", "info", "controller", `Short URL created: ${finalCode}`);

    return res.status(201).json({
      shortLink: `${process.env.BASE_URL}/${finalCode}`,
      expiry: newUrl.expiry,
    });
  } catch (err) {
    await Log("backend", "fatal", "controller", `CreateShortUrl failed: ${err.message}`);
    return res.status(500).json({ error: err.message });
  }
};

export const getClicks = async (req, res) => {
  try {
    const { code } = req.params;

    const urlDoc = await Url.findOne({ shortcode: code }).populate("clicks");
    if (!urlDoc) {
      await Log("backend", "error", "controller", `Shortcode ${code} not found`);
      return res.status(404).json({ error: "Shortcode not found" });
    }

    if (urlDoc.expiry && urlDoc.expiry < new Date()) {
      await Log("backend", "warn", "controller", `Shortcode ${code} expired`);
      return res.status(410).json({ error: "Short link has expired" });
    }

    const newClick = await Click.create({
      url: urlDoc._id,
      ipAddress: req.ip,
      referrer: req.get("referer") || null,
    });

    urlDoc.clicks.push(newClick._id);
    await urlDoc.save();

    const updatedUrl = await Url.findById(urlDoc._id).populate("clicks");

    await Log("backend", "info", "controller", `Click registered for shortcode ${code}`);

    return res.json({
      originalUrl: updatedUrl.originalUrl,
      createdAt: updatedUrl.createdAt,
      expiry: updatedUrl.expiry,
      totalClicks: updatedUrl.clicks.length,
      clicks: updatedUrl.clicks.map((c) => ({
        timestamp: c.clickedAt,
        ip: c.ipAddress,
        referrer: c.referrer,
      })),
    });
  } catch (err) {
    await Log("backend", "fatal", "controller", `GetClicks failed: ${err.message}`);
    return res.status(500).json({ error: err.message });
  }
};
