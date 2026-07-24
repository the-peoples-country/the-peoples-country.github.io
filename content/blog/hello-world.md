---
title: Hello World
description: Why this site exists, and what it is for.
date: '2026-07-24'
---

This is the first post on The People's Country. It exists mostly to prove the
plumbing works, but the plumbing is worth explaining, because it is unusually
simple for what it does.

## Background

The whole site is static files. There is no server, no database, and no runtime
API. Every page you can reach was rendered once, at build time, and handed to a
CDN as plain HTML. That constraint is not a limitation here so much as a design
choice: it means the site cannot go down in any interesting way, and it costs
nothing to host.

Search is the one feature that would normally need a backend. Instead, the build
walks every post, splits it apart at each heading, and writes the result to a
single JSON file. The browser fetches that file the first time you type into a
search box and searches it locally. Nothing leaves your machine.

## What comes next

More posts, mainly. The interesting question for a site like this is not how to
publish the first piece of writing but whether the second one is easy enough
that a third gets written at all. So the founding idea is to keep the machinery
small enough that it never becomes the reason not to write.

If you are reading this and the search box works, the experiment succeeded.
