"use client";

import Rating from "@/components/shared/product/rating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReviews } from "@/lib/actions/review.actions";
import { formatDateTime } from "@/lib/utils";
import { Review } from "@/types";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewForm from "./review-form";

interface ReviewListProps {
  userId: string;
  productId: string;
  productSlug: string;
}

const ReviewList = ({ userId, productId, productSlug }: ReviewListProps) => {
  console.log(userId, productId, productSlug);

  const [reviews, setReviews] = useState<Review[]>([]);

  const reload = async () => {
    const res = await getReviews({ productId });
    if (res.data) setReviews([...res.data]);
  };

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({ productId });
      if (res.data) setReviews(res.data);
    };

    loadReviews();
  }, [productId]);

  return (
    <div className="space-y-4">
      {userId ? (
        <>
          <ReviewForm
            userId={userId}
            productId={productId}
            onReviewSubmitted={reload}
          />
        </>
      ) : (
        <div>
          Please{" "}
          <Link
            className="text-blue-700 px-1"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          To write a review
        </div>
      )}
      {reviews.length === 0 && (
        <div className="w-full flex flex-col items-center gap-4 my-4">
          <Image
            alt="Illustration of file search"
            width={360}
            height={360}
            src={"/images/Illustrations/undraw_file-search_cbur.svg"}
          />
          <span className="font-semibold opacity-65 text-xl">
            No reviews yet
          </span>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-4">
              <div className="flex-between">
                <CardTitle>{review.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div> {review?.description}</div>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <Rating value={review.rating} />
                <div className="flex items-center">
                  <User className="mr-1 h-3 w-3" />
                  {review.user ? review.user.name : "User"}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
