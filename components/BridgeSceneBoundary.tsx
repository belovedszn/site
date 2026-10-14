"use client";
import { Component, type ReactNode } from "react";
export class BridgeSceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(e: unknown) { console.warn("Bridge scene failed, using fallback", e); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
