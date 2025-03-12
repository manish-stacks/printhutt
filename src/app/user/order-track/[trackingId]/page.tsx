"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaShippingFast, FaMapMarkerAlt, FaBox, FaCheckCircle } from "react-icons/fa";

const OrderTrack = () => {
  const params = useParams();
  const trackingId = params?.trackingId as string | undefined;
  const [shipping, setShipping] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getShipping = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/shiprocket/tracking", {
        trackingId,
      });

      setShipping(data?.shipment?.tracking_data || {});
      setOrder(data?.order || {});
    } catch (error) {
      console.error("Error fetching tracking data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackingId) {
      getShipping();
    }
  }, [trackingId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Track Your Order
        </h2>

        {order?.shipment?.trackingId && shipping?.track_status === 0 ? (
          <div className="text-center text-xl text-orange-600 font-semibold">
            🚚 Your shipment is ready to ship!
          </div>
        ) : (
          <>
            {shipping ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Shipment Status:{" "}
                  <span className="text-blue-600">{shipping.shipment_status}</span>
                </h3>

                {/* Shipment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shipping?.shipment_track?.map((track: any, index: number) => (
                    <div
                      key={index}
                      className="border p-4 rounded-lg bg-gray-50 shadow-sm"
                    >
                      <p className="flex items-center gap-2">
                        <FaShippingFast className="text-blue-500" />
                        <span className="font-semibold">Current Status:</span> {track.current_status}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaBox className="text-green-500" />
                        <span className="font-semibold">Consignee Name:</span> {track.consignee_name}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="font-semibold">Origin:</span> {track.origin}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-purple-500" />
                        <span className="font-semibold">Destination:</span> {track.destination}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaCheckCircle className="text-yellow-500" />
                        <span className="font-semibold">Estimated Delivery Date:</span> {track.edd}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tracking URL */}
                {shipping.track_url && (
                  <a
                    href={shipping.track_url}
                    className="text-blue-500 underline block mt-4 text-center md:text-left"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Full Tracking Details
                  </a>
                )}

                {/* Shipment Activities */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Shipment Activities</h3>
                  <ul className="space-y-4">
                    {shipping?.shipment_track_activities?.map(
                      (activity: any, index: number) => (
                        <li
                          key={index}
                          className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                        >
                          <p className="font-semibold text-gray-800">
                            📅 Date: <span className="text-gray-600">{activity.date}</span>
                          </p>
                          <p>
                            ✅ <span className="font-semibold">Status:</span> {activity.status}
                          </p>
                          <p>
                            🚀 <span className="font-semibold">Activity:</span> {activity.activity}
                          </p>
                          <p>
                            📍 <span className="font-semibold">Location:</span> {activity.location}
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Tracking information not available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTrack;
