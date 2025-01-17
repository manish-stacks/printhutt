"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrderTrack = () => {
  const params = useParams();
  const trackingId = params?.trackingId as string | undefined;
  const [shipping, setShipping] = useState<any>(null);

  const getShipping = async () => {
    try {
      const response = await axios.post("/api/shiprocket/tracking", {
        trackingId: trackingId,
      });
      setShipping(response.data.data[trackingId].tracking_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShipping();
  }, []);

  console.log(shipping);

  return (
    <div className="container mx-auto p-4">
      {shipping ? (
        <div className="bg-white shadow-md rounded p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Tracking Information
          </h2>
          {shipping.track_status === 0 ? (
            <p className="text-red-500 text-center">{shipping.error}</p>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Shipment Status:{" "}
                  <span className="text-blue-600">{shipping.shipment_status}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shipping.shipment_track?.map(
                    (track: any, index: number) => (
                      <div
                        key={index}
                        className="border p-4 rounded-lg bg-gray-50 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Current Status:</span>{" "}
                          {track.current_status}
                        </p>
                        <p>
                          <span className="font-semibold">Consignee Name:</span>{" "}
                          {track.consignee_name}
                        </p>
                        <p>
                          <span className="font-semibold">Origin:</span>{" "}
                          {track.origin}
                        </p>
                        <p>
                          <span className="font-semibold">Destination:</span>{" "}
                          {track.destination}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Estimated Delivery Date:
                          </span>{" "}
                          {track.edd}
                        </p>
                      </div>
                    )
                  )}
                </div>
                <a
                  href={shipping.track_url}
                  className="text-blue-500 underline block mt-4 text-center md:text-left"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Track URL
                </a>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Shipment Activities
                </h3>
                <ul className="space-y-4">
                  {shipping.shipment_track_activities?.map(
                    (activity: any, index: number) => (
                      <li
                        key={index}
                        className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {activity.date}
                        </p>
                        <p>
                          <span className="font-semibold">Status:</span>{" "}
                          {activity.status}
                        </p>
                        <p>
                          <span className="font-semibold">Activity:</span>{" "}
                          {activity.activity}
                        </p>
                        <p>
                          <span className="font-semibold">Location:</span>{" "}
                          {activity.location}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default OrderTrack;
