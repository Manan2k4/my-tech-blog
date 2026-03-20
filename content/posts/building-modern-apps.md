---
title: "Building Modern Web Apps with Next.js App Router"
date: "2024-03-20T10:00:00Z"
summary: "An introduction to Next.js 14+ App Router, Server Components, and why it's a game-changer for building modern web applications."
tags: ["Next.js", "React", "Web Dev"]
---

Next.js 13 introduced the new App Router, marking a significant shift in how we build React applications. With Next.js 14, this paradigm has been refined and stabilized. 

In this post, we'll explore why the App Router is such a game-changer and how you can leverage it in your next project.

## Server Components by Default

One of the most profound changes is the introduction of **React Server Components (RSC)**. By default, components in the `app` directory are Server Components. 

This means they render on the server, drastically reducing the amount of JavaScript sent to the client.

```jsx
// This component runs entirely on the server
export default async function UserProfile({ id }) {
  const user = await db.user.findUnique({ where: { id } })
  
  return (
    <div className="card">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

## Mixing Server and Client

When you need interactivity (e.g., event listeners, state), you can easily opt-in to Client Components using the `'use client'` directive. 

```jsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

This clear boundary allows developers to keep heavy logic and data fetching on the server, while only sending interactive UI components to the client.

## File-based Routing Simplified

The `.page.js` convention from the `pages/` directory has evolved. Now, routing is defined by folders, and the UI for a segment is defined by a `page.js` (or `.tsx`) file. 

This allows you to colocate your styles, components, and tests alongside your routes!

![Routing structure](https://nextjs.org/docs/light/app-routing.png)

## Wrapping Up

The App Router requires a mental model shift, but the performance and developer experience benefits are significant. It encourages building thinner client applications while leveraging the server more effectively.
