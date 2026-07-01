import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTranslatorSocket } from './useTranslatorSocket';

let mockWsInstance: any = null;

describe('useTranslatorSocket', () => {
  beforeEach(() => {
    mockWsInstance = {
      readyState: 0,
      close: vi.fn(),
      send: vi.fn(),
      onopen: null,
      onclose: null,
      onerror: null,
      onmessage: null,
    };
    vi.spyOn(window, 'WebSocket').mockImplementation(function() {
      return mockWsInstance as any;
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('initializes with default states', () => {
    const { result } = renderHook(() => useTranslatorSocket());
    
    expect(result.current.isConnected).toBe(false);
    expect(result.current.isTranslating).toBe(false);
    expect(result.current.predictions).toEqual([]);
  });

  it('connects to websocket and sets isConnected to true', () => {
    const { result } = renderHook(() => useTranslatorSocket());
    
    act(() => {
      result.current.connect();
    });

    expect(mockWsInstance).not.toBeNull();

    act(() => {
      mockWsInstance.readyState = 1; // OPEN
      mockWsInstance.onopen?.();
    });

    expect(result.current.isConnected).toBe(true);
  });

  it('handles incoming predictions', () => {
    const { result } = renderHook(() => useTranslatorSocket());
    
    act(() => {
      result.current.connect();
    });

    act(() => {
      mockWsInstance.readyState = 1; // OPEN
      mockWsInstance.onopen?.();
    });

    act(() => {
      mockWsInstance.onmessage?.({
        data: JSON.stringify({
          type: 'prediction',
          text: 'Hello',
          confidence: 0.9,
          gloss: 'Hello'
        })
      });
    });

    expect(result.current.predictions.length).toBe(1);
    expect(result.current.predictions[0].text).toBe('Hello');
  });

  it('disconnects and clears states', () => {
    const { result } = renderHook(() => useTranslatorSocket());
    
    act(() => {
      result.current.connect();
    });

    act(() => {
      mockWsInstance.readyState = 1; // OPEN
      mockWsInstance.onopen?.();
    });

    act(() => {
      result.current.startTranslating();
    });

    expect(result.current.isConnected).toBe(true);
    expect(result.current.isTranslating).toBe(true);

    act(() => {
      result.current.disconnect();
    });

    expect(result.current.isConnected).toBe(false);
    expect(result.current.isTranslating).toBe(false);
  });
});
