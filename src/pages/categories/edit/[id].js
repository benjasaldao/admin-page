import FormCategory from "@components/FormCategory";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import endPoints from "@services/api";

export default function Edit() {
  const [category, setCategory] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getCategory() {
      const response = await axios.get(
        endPoints.categories.getCategory(id)
      );
      setCategory(response.data);
    }
    getCategory();
  }, [router?.isReady]);

  return <FormCategory category={category} />;
}
